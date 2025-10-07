"use client"
import React, { useState } from 'react';
import { Plus, Workflow, Clock, Search, Trash2, Edit, Play } from 'lucide-react';
import Link from 'next/link';

const Builder = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Email to Sheets Automation',
      description: 'Automatically save Gmail attachments to Google Sheets',
      nodes: 5,
      lastModified: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'GitHub Issue Tracker',
      description: 'Track GitHub issues and send notifications',
      nodes: 3,
      lastModified: '1 day ago',
      status: 'inactive'
    },
    {
      id: 3,
      name: 'AI Content Generator',
      description: 'Generate content using OpenAI and save to Drive',
      nodes: 7,
      lastModified: '3 days ago',
      status: 'active'
    },
  ]);

  const handleCreateWorkflow = () => {
    if (workflowName.trim()) {
      const newWorkflow = {
        id: workflows.length + 1,
        name: workflowName,
        description: workflowDescription,
        nodes: 0,
        lastModified: 'Just now',
        status: 'inactive'
      };
      setWorkflows([newWorkflow, ...workflows]);
      setWorkflowName('');
      setWorkflowDescription('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteWorkflow = (id) => {
    setWorkflows(workflows.filter(w => w.id !== id));
  };

  const filteredWorkflows = workflows.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
              <p className="text-sm text-gray-600 mt-1">Create and manage your automation workflows</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              New Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-blue-50 rounded-lg">
                    <Workflow className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkflow(workflow.id);
                      }}
                      className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-1">
                  {workflow.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                  {workflow.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{workflow.nodes} nodes</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {workflow.lastModified}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${workflow.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className="text-xs font-medium text-gray-600 capitalize">{workflow.status}</span>
                  </div>
                </div>
<Link href={`/dashboard/builder/${workflow.id}`} className="block mt-4">
                  <button className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2 rounded-lg transition-colors font-medium text-sm">
                    <Play className="w-4 h-4" />
                    Open Builder
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Workflow className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No workflows found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try a different search term' : 'Get started by creating your first workflow'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Create Workflow
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Workflow</h2>
              <p className="text-sm text-gray-600 mt-1">Set up your automation workflow</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Workflow Name
                </label>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="e.g., Email to Sheets Automation"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder="What does this workflow do?"
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setWorkflowName('');
                  setWorkflowDescription('');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkflow}
                disabled={!workflowName.trim()}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;