'use client'

import React from 'react'
import {cn} from "@/lib/utils";
import {useReactFlow} from "@xyflow/react";

const NodeCard = ({ nodeId, children, isSelected }: {
    nodeId: string,
    children?: React.ReactNode,
    isSelected: boolean,
}) => {
    const { getNode, setCenter } = useReactFlow()

    return (
        <div
            onDoubleClick={() => {
                const node = getNode(nodeId);
                if (!node) {
                    return;
                }

                const {position, measured} = node
                if (!position || !measured) {
                    return;
                }

                const { width, height } = measured;

                const x= position.x + width /2
                const y = position.y + height /2

                if (x === undefined || y === undefined ) {
                    return;
                }
                setCenter(x, y, {
                    zoom: 1,
                    duration: 500
                })

            }}
            className={cn('rounded-md text-xs flex flex-1 flex-col border-separate cursor-pointer bg-background border-2 w-[420px]',
                isSelected && 'border-primary'
            )}>
            {children}
        </div>
    )
}
export default NodeCard
