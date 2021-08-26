class MousePositionObservable {
  constructor() {
    this.subscriptions = [];
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
    return () => this.subscriptions = this.subscriptions.filter(cb => cb !== callback);
  }

  handleMouseMove = (e) => {
    this.subscriptions.forEach(sub => sub(e.clientX, e.clientY));
  }
}

const mousePositionObservable = new MousePositionObservable();

const unsubscribeBox = mousePositionObservable.subscribe((x, y) => {
  console.info('Mouse cursor position', x, y);
  document.querySelector('.mouse-position .position').innerHTML = `
    <p>Client X: ${x}</p>
    <p>Client Y: ${y}</p>
  `;
});

const unsubscribeMouse = mousePositionObservable.subscribe((x, y) => {
  console.info('Mouse cursor position', x, y);
  const circle = document.querySelector('.circle');
  window.setTimeout(() => circle.style.transform = `translate(${x}px, ${y}px)`, 1000);
});

document.querySelector('.mouse-position').addEventListener('click', (e) => {
  e.stopPropagation();
  unsubscribeBox();
});
document.querySelector('.container').addEventListener('click', unsubscribeMouse);
