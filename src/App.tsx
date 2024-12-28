import { useState, useEffect } from "react";

const App = () => {
  const [gyroData, setGyroData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const [accelData, setAccelData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [gyroSupported, setGyroSupported] = useState(true);
  const [accelSupported, setAccelSupported] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOrientation = (event: any) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        setGyroData({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
        });
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMotion = (event: any) => {
      if (event.acceleration) {
        setAccelData({
          x: event.acceleration.x || 0,
          y: event.acceleration.y || 0,
          z: event.acceleration.z || 0,
        });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
      console.log("DeviceOrientationEvent is supported");
    } else {
      setGyroSupported(false);
      console.log("DeviceOrientationEvent is not supported");
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion);
      console.log("DeviceMotionEvent is supported");
    } else {
      setAccelSupported(false);
      console.log("DeviceMotionEvent is not supported");
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Game Screen</h1>

      <div className="p-5 border">
        <h2>Гироскоп</h2>
        {gyroSupported ? (
          <>
            <p>Alpha (Z): {gyroData.alpha.toFixed(2)}°</p>
            <p>Beta (X): {gyroData.beta.toFixed(2)}°</p>
            <p>Gamma (Y): {gyroData.gamma.toFixed(2)}°</p>
          </>
        ) : (
          <p>Гироскоп не поддерживается вашим устройством.</p>
        )}
      </div>

      <div className="p-5 border">
        <h2>Акселерометр</h2>
        {accelSupported ? (
          <>
            <p>X: {accelData.x.toFixed(2)} m/s²</p>
            <p>Y: {accelData.y.toFixed(2)} m/s²</p>
            <p>Z: {accelData.z.toFixed(2)} m/s²</p>
          </>
        ) : (
          <p>Акселерометр не поддерживается вашим устройством.</p>
        )}
      </div>
    </div>
  );
};

export default App;
