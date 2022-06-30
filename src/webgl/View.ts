/*
 * View.ts
 * ===========
 * Topmost Three.js class.
 * Controls scene, cam, renderer, and objects in scene.
 */

import * as THREE from "three";
import HelloWorldCube from "./HelloWorldCube";

import Shape from "./Shape";

export default class View {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  private object: HelloWorldCube;

  constructor(canvasElem: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElem,
      antialias: false,
    });
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.z = 15;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.TextureLoader().load(
      "./textures/bgnd.png"
    );
    this.setSceneLight(0xffffff);
    this.object = new HelloWorldCube(this.scene);

    // Set initial sizes
    this.onWindowResize(window.innerWidth, window.innerHeight);
  }

  public onWindowResize(vpW: number, vpH: number): void {
    this.renderer.setSize(vpW, vpH, false);
    this.camera.aspect = vpW / vpH;
    this.camera.updateProjectionMatrix();
  }

  public update(secs: number): void {
    this.object.update(secs);
    this.renderer.render(this.scene, this.camera);
  }

  public setSceneLight(color: number) {
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }
}
