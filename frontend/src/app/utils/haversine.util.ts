export function calculateHaversineDistance(
    coord1: [number, number], 
    coord2: [number, number]
): number {
    const earthRadiusInKm = 6371;
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const deltaLatitude = toRad(lat2-lat1);
    const deltaLongitude = toRad(lon2-lon1);
    const haversineOfCentralAngle = Math.sin(deltaLatitude/2)*Math.sin(deltaLatitude / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);
    const centralAngle =2 * Math.atan2(Math.sqrt(haversineOfCentralAngle), Math.sqrt(1-haversineOfCentralAngle));
    return earthRadiusInKm*centralAngle;
  }

  export function toRad(value: number): number {
    return (value*Math.PI) /180;
  }