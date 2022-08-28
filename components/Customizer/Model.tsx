import React from "react";
import { useGLTF } from "@react-three/drei";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { type TItems } from "pages/suit";

interface LocalProps {
  setCurrent: (c: keyof TItems | "") => void;
  items: TItems;
}

const useColorCursor = (items: TItems) => {
  const [hovered, setHovered] = React.useState<keyof TItems | null>(null);

  React.useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${
      hovered ? items[hovered] : "transparent"
    }"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    document.body.style.cursor = hovered
      ? `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      : "auto";
  }, [hovered, items]);

  return { setHovered };
};

const Model = (props: LocalProps) => {
  const { items, setCurrent } = props;

  const modelRef = React.useRef<Group>();
  const { setHovered } = useColorCursor(items);

  // @ts-ignore
  const { nodes } = useGLTF("/astronaut.glb");
  const meshNodes: { [key: string]: Mesh } = {};

  Object.keys(nodes).forEach((key) => {
    if (nodes[key].type === "Mesh") {
      meshNodes[key] = nodes[key] as Mesh;
    }
  });

  return (
    <group
      ref={modelRef as React.Ref<Group> | undefined}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(
          ((e.object as Mesh).material as MeshStandardMaterial)
            .name as keyof TItems
        );
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && setHovered(null);
      }}
      onPointerMissed={() => {
        setCurrent("");
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        const material = (e.object as Mesh).material as MeshStandardMaterial;
        setCurrent(material.name as keyof TItems);
      }}
      scale={2}
      position={[0, -3, 0]}
    >
      {Object.keys(meshNodes).map((key) => {
        const material = meshNodes[key].material as MeshStandardMaterial;
        const partName = material.name as keyof TItems;

        return (
          <mesh
            key={meshNodes[key].uuid}
            material={meshNodes[key].material}
            geometry={meshNodes[key].geometry}
            material-color={items[partName]}
          />
        );
      })}
    </group>
  );
};

export default Model;
