'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './ProjectsListView.css'

export default function ProjectsListView() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects?depth=1&limit=50')
        const data = await res.json()
        setProjects(data.docs || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleCreate = () => {
    router.push('/admin/collections/projects/create')
  }

  const handleCardClick = (id: string) => {
    router.push(`/admin/collections/projects/${id}`)
  }

  if (loading) {
    return (
      <div className="projects-list-view">
        <div className="projects-list-header">
          <div>
            <h1 className="projects-list-title">Projects</h1>
            <p className="projects-list-subtitle">Manage your portfolio projects</p>
          </div>
          <button className="projects-create-btn" onClick={handleCreate}>
            <span className="projects-create-icon">+</span>
            Create New
          </button>
        </div>
        <div className="projects-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="project-card project-card--skeleton">
              <div className="project-card__image-skeleton" />
              <div className="project-card__info-skeleton">
                <div className="skeleton-line skeleton-line--title" />
                <div className="skeleton-line skeleton-line--subtitle" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="projects-list-view">
      <div className="projects-list-header">
        <div>
          <h1 className="projects-list-title">Projects</h1>
          <p className="projects-list-subtitle">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button className="projects-create-btn" onClick={handleCreate}>
          <span className="projects-create-icon">+</span>
          Create New
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <div className="projects-empty__icon">📁</div>
          <h3>No projects yet</h3>
          <p>Create your first project to get started.</p>
          <button className="projects-create-btn" onClick={handleCreate}>
            <span className="projects-create-icon">+</span>
            Create Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project: any) => {
            const coverUrl = project.coverMedia?.url || project.coverMedia?.thumbnailURL || ''
            const isVideo = project.coverMedia?.mimeType?.startsWith('video/')
            const category = project.category || ''
            const isHomepage = project.showOnHome === true

            return (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleCardClick(project.id)}
              >
                <div className="project-card__image-wrap">
                  {isVideo && coverUrl ? (
                    <video
                      src={coverUrl}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="project-card__media"
                    />
                  ) : coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={project.title}
                      className="project-card__media"
                    />
                  ) : (
                    <div className="project-card__placeholder">
                      <span>🖼️</span>
                    </div>
                  )}
                  <div className="project-card__overlay">
                    <span className="project-card__edit-icon">✏️ Edit</span>
                  </div>
                  {isHomepage && (
                    <span className="project-card__badge">Homepage</span>
                  )}
                </div>
                <div className="project-card__info">
                  <h3 className="project-card__title">{project.title}</h3>
                  {category && (
                    <p className="project-card__category">{category}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
