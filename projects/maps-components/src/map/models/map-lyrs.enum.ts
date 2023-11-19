
export enum MapLyrs {
  Hybrid = 1,
  Satellite,
  Streets,
  Terrain
}



export class MapLyrsLabel {
  private static lyrs = {
    [MapLyrs.Hybrid]: 's,h',
    [MapLyrs.Satellite]: 's',
    [MapLyrs.Streets]: 'm',
    [MapLyrs.Terrain]: 'p'
  };

  public static get(lyrs: MapLyrs): string {
    return MapLyrsLabel.lyrs[lyrs];
  }
}
