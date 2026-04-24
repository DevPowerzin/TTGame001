class Inventory {
  constructor() {
    this.items = [];
    this.open = false;
    this.selectedIndex = null;
    this.viewingItem = null;
  }

  toggle() {
    this.open = !this.open;
  }

  addItem(item) {
    this.items.push(item);
  }

  handleClick(x, y) {

    if (this.viewingItem) {
  this.viewingItem = null;
  return;
}

    if (!this.open) return;

    let startX = 150;
    let startY = 150;

    for (let i = 0; i < 8; i++) {
      let slotX = startX + (i % 4) * 100;
      let slotY = startY + Math.floor(i / 4) * 100;

      if (
        x > slotX && x < slotX + 80 &&
        y > slotY && y < slotY + 80
      ) {
        this.selectedIndex = i;
      }

      // botão VER
if (x > 550 && x < 650 && y > 350 && y < 390) {
  if (this.items[this.selectedIndex]) {
    this.viewingItem = this.items[this.selectedIndex];
  }
}
    }
  }

  draw(ctx) {
    if (!this.open) return;

    // overlay escuro
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, 800, 500);

    // caixa inventário
    ctx.fillStyle = "#111";
    ctx.fillRect(100, 80, 600, 340);

    ctx.strokeStyle = "#555";
    ctx.strokeRect(100, 80, 600, 340);

    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("INVENTORY", 320, 110);

    let startX = 150;
    let startY = 150;

    for (let i = 0; i < 8; i++) {
      let x = startX + (i % 4) * 100;
      let y = startY + Math.floor(i / 4) * 100;

      // destaque selecionado
      if (this.selectedIndex === i) {
        ctx.fillStyle = "#333";
        ctx.fillRect(x, y, 80, 80);
      }

      ctx.strokeStyle = "#888";
      ctx.strokeRect(x, y, 80, 80);

      let item = this.items[i];
      if (item && item.icon) {
        ctx.drawImage(item.icon, x + 10, y + 10, 60, 60);
      }
    }

    // descrição
    if (this.selectedIndex !== null && this.items[this.selectedIndex]) {
      const item = this.items[this.selectedIndex];

      ctx.fillStyle = "white";
      ctx.font = "16px monospace";
      ctx.fillText(item.name, 150, 360);

      ctx.fillStyle = "#aaa";
      ctx.fillText(item.desc, 150, 390);

      // botão VER
        ctx.fillStyle = "#222";
        ctx.fillRect(550, 350, 100, 40);

        ctx.strokeStyle = "#888";
        ctx.strokeRect(550, 350, 100, 40);

        ctx.fillStyle = "white";
        ctx.font = "18px monospace";
        ctx.fillText("VER", 575, 375);
    }
    // tela de visualização
if (this.viewingItem) {
  ctx.fillStyle = "rgba(0,0,0,0.9)";
  ctx.fillRect(0, 0, 800, 500);

  if (this.viewingItem.icon) {
    ctx.drawImage(this.viewingItem.icon, 250, 100, 300, 300);
  }

  ctx.fillStyle = "white";
  ctx.font = "20px monospace";
  ctx.fillText("Clique para voltar", 280, 450);
}
  }
}