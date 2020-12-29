class ProjectNameModel {
  constructor(data) {
    this.id = data.id ?? null;
    this.name = data.name ?? "";
    this.logo_url = data.logo_url ?? "";
  }

  getProjectName = () => {
    return (
      <>
        <img src={this.logo_url} className="img-avatar me-2" />
        {this.name}
      </>
    );
  };
}

export { ProjectNameModel };
