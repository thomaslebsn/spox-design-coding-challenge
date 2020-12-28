class ProjectLeadModel {
  constructor(data) {
    this.id = data.id ?? null;
    this.name = data.name ?? "";
    this.avatarUrl = data.avatar_url ?? "";
  }

  getName = () => {
    return (
      <>
        <img src={this.avatarUrl} className="img-avatar me-2" />
        {this.name}
      </>
    )
  }
}

export {
  ProjectLeadModel
};