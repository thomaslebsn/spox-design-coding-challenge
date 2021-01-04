class ChannelModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.progress ?? "";
    this.channel = data.channel ?? "";
    this.image = data.image ?? "";
    this.icon = data.icon ?? "";
  }
}

export { ChannelModel };
