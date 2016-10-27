export class ModelCollaborator {

  private _username: string;
  private _sessionId: string;

  constructor(username: string, sessionId: string) {
    this._username = username;
    this._sessionId = sessionId;
    Object.freeze(this);
  }

  username(): string {
    return this._username;
  }

  sessionId(): string {
    return this._sessionId;
  }
}
