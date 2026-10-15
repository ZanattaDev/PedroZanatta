/* Pedro Zanatta — cena 3D (Three.js)
   - Pilha de discos (banco de dados) no topo da página
   - Carrossel de ícones das linguagens na seção Stack
   As posições vêm de window.PZ.state, animado pelo GSAP em app.js.
   Segue o tema claro/escuro do sistema. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const PZ = window.PZ || { state: { coreX: 2.6, coreY: 0, coreScale: 1, spread: .62, coreTilt: .35, ringShow: 0, ringRot: 0, intro: 1 }, tech: [] };
const S = PZ.state;
const TECH = PZ.tech;
const canvas = document.getElementById('webgl');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkMQ = matchMedia('(prefers-color-scheme: dark)');

try { init(); } catch (err) { console.warn('[3D] WebGL indisponível:', err); canvas?.remove(); }

function init() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.set(0, 0, 10);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture;

  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(3, 5, 6);
  const warm = new THREE.PointLight(0xff6a3d, 30, 14);
  warm.position.set(-3.5, 1.5, 3);
  scene.add(key, warm);

  /* ── Banco de dados ── */
  const core = new THREE.Group();
  const coreSpin = new THREE.Group();
  core.add(coreSpin);
  scene.add(core);

  const discGeo = new THREE.CylinderGeometry(1, 1, .42, 96, 1);
  const discMat = new THREE.MeshPhysicalMaterial({ metalness: .85, roughness: .3, clearcoat: 1, clearcoatRoughness: .2 });
  const rimMat = new THREE.MeshBasicMaterial({ color: 0xff6a3d, toneMapped: false });
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x3ddc84, toneMapped: false });
  const rimGeo = new THREE.TorusGeometry(1.002, .011, 8, 180);
  const ledGeo = new THREE.SphereGeometry(.026, 12, 12);
  const discs = [];

  for (let i = 0; i < 3; i++) {
    const d = new THREE.Group();
    d.add(new THREE.Mesh(discGeo, discMat));
    [.21, -.21].forEach(y => {
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = y;
      d.add(rim);
    });
    for (let k = 0; k < 3; k++) {
      const a = -.3 + k * .1;
      const led = new THREE.Mesh(ledGeo, k === 0 ? ledMat : rimMat);
      led.position.set(Math.sin(a) * 1.004, 0, Math.cos(a) * 1.004);
      d.add(led);
    }
    discs.push(d);
    coreSpin.add(d);
  }
  const topRing = new THREE.Mesh(new THREE.RingGeometry(.5, .53, 96), rimMat);
  topRing.rotation.x = -Math.PI / 2;
  topRing.position.y = .212;
  discs[2].add(topRing);

  // "requisições" passando em volta
  const orbit = new THREE.Group();
  orbit.rotation.set(.32, 0, -.18);
  core.add(orbit);
  const R_ORBIT = 1.7;
  const orbitPts = [];
  for (let i = 0; i <= 128; i++) { const a = i / 128 * Math.PI * 2; orbitPts.push(new THREE.Vector3(Math.cos(a) * R_ORBIT, 0, Math.sin(a) * R_ORBIT)); }
  const orbitMat = new THREE.LineBasicMaterial({ transparent: true });
  orbit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(orbitPts), orbitMat));
  const PACKETS = 14;
  const packets = new THREE.InstancedMesh(new THREE.BoxGeometry(.05, .05, .05), rimMat, PACKETS);
  orbit.add(packets);
  const dummy = new THREE.Object3D();

  /* ── Ícones das linguagens ── */
  const ring = new THREE.Group();
  const ringSpin = new THREE.Group();
  ring.add(ringSpin);
  scene.add(ring);

  const step = TECH.length ? Math.PI * 2 / TECH.length : 0;
  const tileGeo = new RoundedBoxGeometry(1.2, 1.2, .22, 5, .24);

  const tiles = TECH.map((t, i) => {
    const pivot = new THREE.Group();
    pivot.rotation.y = i * step;
    ringSpin.add(pivot);

    const face = iconTexture(t, renderer);
    const front = new THREE.MeshPhysicalMaterial({ map: face.tex, roughness: .35, clearcoat: .7, clearcoatRoughness: .2 });
    const side = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(t.color), roughness: .35, metalness: .1, clearcoat: .7 });
    const mesh = new THREE.Mesh(tileGeo, [side, side, side, side, front, side]);
    pivot.add(mesh);
    return { mesh, face };
  });

  /* ── Partículas ── */
  const P = 500;
  const pPos = new Float32Array(P * 3);
  for (let i = 0; i < P; i++) {
    // atrás da cena, nunca perto da câmera
    pPos.set([(Math.random() - .5) * 26, (Math.random() - .5) * 16, -14 + Math.random() * 13], i * 3);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: .03, transparent: true, depthWrite: false });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ── Tema claro / escuro ── */
  function applyTheme() {
    const dark = darkMQ.matches;
    renderer.toneMappingExposure = dark ? 1.05 : 1;
    discMat.color.set(dark ? 0x1a1a1f : 0xe4e4e8);
    discMat.metalness = dark ? .85 : .6;
    discMat.roughness = dark ? .3 : .22;
    orbitMat.color.set(dark ? 0xffffff : 0x000000);
    orbitMat.opacity = dark ? .12 : .1;
    pMat.color.set(dark ? 0xffffff : 0x1a1a1a);
    pMat.opacity = dark ? .4 : .22;
    warm.intensity = dark ? 30 : 14;
    tiles.forEach(t => t.face.draw(dark));
  }
  applyTheme();
  darkMQ.addEventListener?.('change', applyTheme);

  /* ── Layout responsivo ── */
  let aspect = 1, xFactor = 1, ringBase = 1;
  function resize() {
    const w = innerWidth, h = innerHeight;
    aspect = w / h;
    renderer.setPixelRatio(Math.min(devicePixelRatio, w < 760 ? 1.75 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = aspect;
    camera.position.z = aspect < .8 ? 11.5 : 10;
    camera.updateProjectionMatrix();
    const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * aspect;
    xFactor = Math.min(1, aspect / 1.7);
    ringBase = (aspect < .8 ? 1 : .9) * Math.min(1, Math.max(.7, h / 1000));
    const R = Math.min(2.7, Math.max(1.15, halfW * .6));
    tiles.forEach(t => { t.mesh.position.z = R; });
  }
  resize();
  addEventListener('resize', resize);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => {
    pointer.tx = e.clientX / innerWidth * 2 - 1;
    pointer.ty = e.clientY / innerHeight * 2 - 1;
  }, { passive: true });

  /* ── Loop ── */
  const clock = new THREE.Clock();
  const speed = reduced ? .15 : 1;
  const ease = x => 1 - Math.pow(1 - x, 3);
  let first = true;

  renderer.setAnimationLoop(() => {
    const t = clock.getElapsedTime() * speed;
    pointer.x += (pointer.tx - pointer.x) * .05;
    pointer.y += (pointer.ty - pointer.y) * .05;
    camera.position.x = pointer.x * .25;
    camera.position.y = -pointer.y * .15;
    camera.lookAt(0, 0, 0);

    const intro = ease(Math.min(1, Math.max(0, S.intro ?? 1)));
    const cs = S.coreScale * intro;
    core.visible = cs > .003;
    if (core.visible) {
      core.scale.setScalar(cs);
      core.position.set(S.coreX * xFactor, S.coreY + Math.sin(t * .8) * .07, 0);
      core.rotation.set(S.coreTilt + pointer.y * .1, 0, -.12 + pointer.x * .06);
      coreSpin.rotation.y = t * .2 - (1 - intro) * 2.5;
      discs.forEach((d, i) => { d.position.y = (i - 1) * S.spread; });
      for (let i = 0; i < PACKETS; i++) {
        const a = i / PACKETS * Math.PI * 2 + t * .45;
        dummy.position.set(Math.cos(a) * R_ORBIT, 0, Math.sin(a) * R_ORBIT);
        dummy.rotation.set(a, a, 0);
        dummy.updateMatrix();
        packets.setMatrixAt(i, dummy.matrix);
      }
      packets.instanceMatrix.needsUpdate = true;
    }

    const rs = S.ringShow;
    ring.visible = rs > .003 && tiles.length > 0;
    if (ring.visible) {
      ring.scale.setScalar(rs * ringBase);
      ring.position.y = (aspect < .8 ? .3 : 0) - (1 - rs) * 1.2;
      ring.rotation.x = .08 + pointer.y * .04;
      ringSpin.rotation.y = -S.ringRot * step + (1 - rs) * 1.4;
      tiles.forEach((tile, i) => {
        const active = Math.abs(i - S.ringRot) < .5;
        const s = tile.mesh.scale.x + ((active ? 1.15 : .88) - tile.mesh.scale.x) * .1;
        tile.mesh.scale.setScalar(s);
        tile.mesh.rotation.y = Math.sin(t * .7 + i) * .18;
        tile.mesh.rotation.x = Math.sin(t * .5 + i * 2) * .06;
        tile.mesh.position.y = Math.sin(t * 1.1 + i * .9) * .06;
      });
    }

    particles.rotation.y = t * .01 + scrollY * .0001;

    renderer.render(scene, camera);
    if (first) { first = false; canvas.classList.add('ready'); }
  });
}

/* Face do ícone: fundo + logo da linguagem (devicon) */
function iconTexture(t, renderer) {
  const N = 512;
  const cvs = document.createElement('canvas');
  cvs.width = cvs.height = N;
  const ctx = cvs.getContext('2d');
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  let img = null;
  let dark = false;

  function draw(isDark = dark) {
    dark = isDark;
    ctx.fillStyle = dark ? '#1c1c1f' : '#ffffff';
    ctx.fillRect(0, 0, N, N);
    if (img) {
      const s = N * .58;
      ctx.drawImage(img, (N - s) / 2, (N - s) / 2, s, s);
    } else {
      ctx.fillStyle = t.color;
      ctx.font = `700 ${N * .3}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.name.slice(0, 2), N / 2, N / 2);
    }
    tex.needsUpdate = true;
  }

  if (t.icon) {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => { img = im; draw(); };
    im.src = t.icon;
  }
  draw();
  return { tex, draw };
}
