'use client'

import React from 'react'
import {Workflow} from "@prisma/client";
import {Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState} from "@xyflow/react";

import "@xyflow/react/dist/style.css"
import {CreateFlowNode} from "@/lib/workflow/createFlowNode";
import {TaskType} from "@/types/task";
import NodeComponent from "@/app/workflow/_components/nodes/NodeComponent";

const nodeTypes = {
    GlowScrapeNode: NodeComponent
}

const snapGrid: [number, number] = [30, 30]
const fitViewOptions = { padding: 2}

const FlowEditor = ({ workflow }:{workflow: Workflow}) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER)
    ])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    return (
        <main className={'h-full w-full'}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                snapToGrid
                fitView
                fitViewOptions={fitViewOptions}
                snapGrid={snapGrid}
            >
                <Controls position={'bottom-left'} fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}
export default FlowEditor
