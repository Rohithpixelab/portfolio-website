import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import ProjectGallery from './ProjectGallery';
import styles from './ProjectPage.module.css';

import ProjectPageClient from './ProjectPageClient';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('Project ID received:', id);

  const payload = await getPayload({ config: configPromise });

  // Handle preview case where id might be literal '{{id}}' or encoded
  const isPreview = id === '{{id}}' || id === '%7B%7Bid%7D%7D' || id === 'preview';
  
  // Fetch the current project with its cover media and gallery media populated
  const project = (isPreview || !id) ? null : await payload.findByID({
    collection: 'projects',
    id,
    depth: 2,
  }).catch(() => null);

  if (!project && !isPreview) {
    notFound();
  }

  // Handle preview case where project might be null initially
  const initialProject = project || { title: 'New Project', id: 'preview' };

  // Fetch all projects for the "next project" navigation
  const allProjects = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: 'createdAt',
  });

  // Determine the next project in the list
  const currentIndex = allProjects.docs.findIndex((p: any) => String(p.id) === String(id));
  const nextProject = allProjects.docs[(currentIndex + 1) % allProjects.docs.length];

  return (
    <ProjectPageClient 
      initialProject={initialProject} 
      id={id} 
      nextProject={nextProject} 
    />
  );
}
