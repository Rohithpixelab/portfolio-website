'use client';

import React, { useState, useRef } from 'react';
import { useField } from '@payloadcms/ui';

export function BulkUploadField() {
  const { value, setValue } = useField<any[]>({ path: 'bulkGallery' });
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [progressFiles, setProgressFiles] = useState<{name: string, status: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setStatus(`Preparing to upload ${files.length} files...`);
    const newProgress = Array.from(files).map(f => ({ name: f.name, status: 'Pending...' }));
    setProgressFiles([...newProgress]);
    
    const newMediaIds: any[] = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        let p = [...newProgress];
        p[i].status = 'Uploading...';
        setProgressFiles(p);
      
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt', file.name);
        
        try {
            const res = await fetch('/api/media', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            
            if (res.ok && data && data.doc && data.doc.id) {
                newMediaIds.push(data.doc.id);
                p[i].status = 'Done!';
            } else {
                p[i].status = 'Failed';
                console.error(data);
            }
        } catch (err) {
            p[i].status = 'Failed';
            console.error('Upload failed', err);
        }
        setProgressFiles(p);
    }
    
    // Extract existing IDs from the current bulkGallery field value
    const existing = Array.isArray(value) ? value : [];
    // If the value returns objects (hydrated docs), we map to their IDs
    const existingIds = existing.map(item => (typeof item === 'object' && item?.id ? item.id : item));
    
    setValue([...existingIds, ...newMediaIds]);
    
    setStatus(`Successfully added ${newMediaIds.length} files to the gallery queue! Save the page to apply changes.`);
    
    setTimeout(() => {
      setStatus('');
      setProgressFiles([]);
      setIsUploading(false);
    }, 5000);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <label className="field-label" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', lineHeight: '1.2' }}>
        Bulk Gallery Upload
      </label>
      
      <div 
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--theme-success-500)'; }}
        onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--theme-elevation-200)'; }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = 'var(--theme-elevation-200)';
          if (!isUploading) handleFiles(e.dataTransfer.files);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px dashed var(--theme-elevation-250)',
          padding: '12px 24px',
          background: 'var(--theme-elevation-50)',
          cursor: isUploading ? 'wait' : 'default',
          transition: 'all 0.2s',
          position: 'relative'
        }}
      >
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={(e) => handleFiles(e.target.files)}
          accept="image/*,video/*"
        />
        
        {isUploading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'var(--theme-success-500)', fontSize: '13px', fontWeight: 600 }}>{status}</div>
            <div style={{ fontSize: '13px', color: 'var(--theme-elevation-400)' }}>
               {progressFiles.filter(f => f.status === 'Done!').length} / {progressFiles.length}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
                style={{
                  background: 'var(--theme-elevation-150)',
                  border: '1px solid var(--theme-elevation-150)',
                  color: 'inherit',
                  padding: '6px 12px',
                  lineHeight: '1.1',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: 500
                }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--theme-elevation-200)'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--theme-elevation-150)'}
              >
                Create New
              </button>
              
              <span style={{ fontSize: '13px', color: 'var(--theme-elevation-400)' }}>or</span>
              
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
                style={{
                  background: 'var(--theme-elevation-150)',
                  border: '1px solid var(--theme-elevation-150)',
                  color: 'inherit',
                  padding: '6px 12px',
                  lineHeight: '1.1',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: 500
                }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--theme-elevation-200)'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--theme-elevation-150)'}
              >
                Choose from existing
              </button>
            </div>
            
            <div style={{ fontSize: '13px', color: 'var(--theme-elevation-400)', pointerEvents: 'none' }}>
              or drag and drop multiple files
            </div>
          </>
        )}
      </div>
    </div>
  );
}
