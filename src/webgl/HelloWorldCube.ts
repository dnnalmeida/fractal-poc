/*
 * Shape.ts
 * ===========
 * Placeholder shape to demonstrate setup works.
 * Has capacity to import custom .glsl shader files
 */

import * as THREE from "three";
import vertShader from "./glsl/helloworld.vs";
import fragShader from "./glsl/helloworld.fs";

export default class HelloWorldCube {
  mesh: THREE.Mesh;
  timeU: THREE.IUniform;
  boxWidth: 1;
  boxHeight: 1;
  boxDepth: 1;

  constructor(parentScene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(
      this.boxWidth,
      this.boxHeight,
      this.boxDepth
    );
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
    });
    this.timeU = material.uniforms.time;
    this.mesh = new THREE.Mesh(geometry, material);
    parentScene.add(this.mesh);
  }

  public update(secs: number): void {
	this.timeU.value = secs;
    this.mesh.rotation.x = secs;
    this.mesh.rotation.y = secs;
  }

  public setPos(x: number) {
    this.mesh.position.x = x;
  }
}
