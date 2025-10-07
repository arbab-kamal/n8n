"use client";
import React, { useState, useCallback, useRef, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Mail, Calendar, FileSpreadsheet, HardDrive, Github, Sparkles, Brain, Zap, Workflow, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CustomNode({ data }) {
  const icons = {
    gmail: Mail,
    calendar: Calendar,
    sheets: FileSpreadsheet,
    drive: HardDrive,
    github: Github,
    openai: Sparkles,
    gemini: Brain,
  };
  
  const Icon = icons[data.icon] || Mail;
  
  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 !bg-blue-500 !border-2 !border-white shadow-md"
      />
      
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 min-w-[220px] border-2 border-blue-200 hover:border-blue-400 group-hover:scale-105">
        <div className="p-5 flex items-start gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900 mb-1">{data.label}</div>
            <div className="text-xs text-blue-600 font-semibold">{data.service}</div>
          </div>
        </div>
        {data.description && (
          <div className="px-5 pb-4 pt-0">
            <div className="text-xs text-gray-600 bg-blue-50 rounded-lg px-3 py-2.5 border border-blue-100">
              {data.description}
            </div>
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-4 h-4 !bg-blue-500 !border-2 !border-white shadow-md"
      />
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

const availableNodes = [
  {
    id: 'gmail',
    service: 'Google',
    label: 'Gmail',
    icon: 'gmail',
    description: 'Read/write emails',
    auth: 'OAuth2',
  },
  {
    id: 'calendar',
    service: 'Google',
    label: 'Google Calendar',
    icon: 'calendar',
    description: 'Create/manage events',
    auth: 'OAuth2',
  },
  {
    id: 'sheets',
    service: 'Google',
    label: 'Google Sheets',
    icon: 'sheets',
    description: 'Append/read rows',
    auth: 'OAuth2',
  },
  {
    id: 'drive',
    service: 'Google',
    label: 'Google Drive',
    icon: 'drive',
    description: 'Fetch/upload files',
    auth: 'OAuth2',
  },
  {
    id: 'github',
    service: 'GitHub',
    label: 'GitHub',
    icon: 'github',
    description: 'Repos, issues, PRs',
    auth: 'PAT',
  },
  {
    id: 'openai',
    service: 'OpenAI',
    label: 'OpenAI',
    icon: 'openai',
    description: 'GPT-4, embeddings, DALL·E',
    auth: 'API Key',
  },
  {
    id: 'gemini',
    service: 'Google',
    label: 'Google Gemini',
    icon: 'gemini',
    description: 'AI model, generation',
    auth: 'API Key',
  },
];

export default function FlowBuilder() {
  const router = useRouter();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  // Check if workflow is valid (all nodes are connected)
  const workflowValidation = useMemo(() => {
    if (nodes.length === 0) {
      return { isValid: false, message: 'Add nodes to start building' };
    }
    if (nodes.length === 1) {
      return { isValid: true, message: 'Single node workflow ready' };
    }
    
    const nodeIds = new Set(nodes.map(n => n.id));
    const connectedNodes = new Set();
    
    edges.forEach(edge => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });
    
    const disconnectedNodes = [...nodeIds].filter(id => !connectedNodes.has(id));
    
    if (disconnectedNodes.length > 0) {
      return { 
        isValid: false, 
        message: `${disconnectedNodes.length} node(s) not connected` 
      };
    }
    
    return { isValid: true, message: 'Workflow is ready!' };
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { stroke: '#3b82f6', strokeWidth: 3 },
      type: 'smoothstep',
    }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const nodeData = availableNodes.find((n) => n.id === type);
      if (!nodeData || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${nodeIdCounter}`,
        type: 'custom',
        position,
        data: {
          label: nodeData.label,
          service: nodeData.service,
          icon: nodeData.icon,
          description: nodeData.description,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((c) => c + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleActivateWorkflow = () => {
    if (workflowValidation.isValid) {
      router.push('/chat');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r-2 border-blue-100 shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-lg z-10 ">
          <button
            onClick={() => router.push('/dashboard/builder')}
            className="mb-4 flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all text-white text-sm font-medium"
            title="Back to Builder Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Components</h2>
            </div>
          </div>
          <p className="text-sm text-blue-100">Drag components to canvas</p>
        </div>

        <div className="p-4 space-y-3">
          {availableNodes.map((node) => {
            const Icon = {
              gmail: Mail,
              calendar: Calendar,
              sheets: FileSpreadsheet,
              drive: HardDrive,
              github: Github,
              openai: Sparkles,
              gemini: Brain,
            }[node.icon];

            return (
              <div
                key={node.id}
                className="p-4 bg-white rounded-xl border-2 border-blue-200 cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-lg transition-all duration-200 hover:scale-102"
                draggable
                onDragStart={(e) => onDragStart(e, node.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-gray-900 block">{node.label}</span>
                    <span className="text-xs text-blue-600 font-semibold">{node.service}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-2 leading-relaxed">{node.description}</div>
                <div className="inline-flex items-center text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg font-semibold border border-blue-200">
                  <Zap className="w-3 h-3 mr-1.5" />
                  {node.auth}
                </div>
              </div>
            );
          })}
        </div>

        <div className="m-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
          <h3 className="font-bold text-sm text-blue-900 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Quick Guide
          </h3>
          <div className="space-y-2.5 text-xs text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">1</div>
              <span className="leading-relaxed">Drag components onto the canvas</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">2</div>
              <span className="leading-relaxed">Connect nodes via circular handles</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">3</div>
              <span className="leading-relaxed">Build powerful automated workflows</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-white"
        >
          <Background 
            color="#cbd5e1" 
            gap={24} 
            size={1.5}
            className="opacity-50"
          />
          <Controls className="bg-white border-2 border-blue-200 rounded-xl shadow-lg [&_button]:border-blue-100 [&_button:hover]:bg-blue-50" />
          <MiniMap
            className="bg-white border-2 border-blue-200 rounded-xl shadow-lg"
            nodeColor="#3b82f6"
            maskColor="rgba(219, 234, 254, 0.7)"
          />
          <Panel position="top-right" className="bg-white p-5 rounded-xl shadow-xl border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-500 rounded-lg">
                <Workflow className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-900">Workflow Stats</div>
            </div>
            <div className="text-xs text-gray-600 space-y-2 mb-4">
              <div className="flex items-center justify-between gap-4 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                <span className="font-medium">Nodes</span>
                <span className="font-bold text-blue-600">{nodes.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                <span className="font-medium">Connections</span>
                <span className="font-bold text-blue-600">{edges.length}</span>
              </div>
            </div>
            
            {/* Validation Status */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${
              workflowValidation.isValid 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-amber-50 border border-amber-200'
            }`}>
              {workflowValidation.isValid ? (
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
              <span className={`text-xs font-medium ${
                workflowValidation.isValid ? 'text-green-700' : 'text-amber-700'
              }`}>
                {workflowValidation.message}
              </span>
            </div>

            {/* Activate Button */}
            <button
              onClick={handleActivateWorkflow}
              disabled={!workflowValidation.isValid}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                workflowValidation.isValid
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Activate & Chat
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
