import React, { useRef, useEffect } from "react";
import p5 from "p5";

//[Males],[Females],[Children]

const dummyData={
    males: [
        { name: "John", age: 30 }
   
    ],
    females :[{name: "Jane", age: 28 }],
    children :[{}]
}

const Canvas = () => {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p) => {
      function drawNode(x, y, name) {
        p.fill(255);
        p.rect(x - 50, y - 20, 100, 40, 10);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(name, x, y);
      }

      p.setup = () => {
        const { width, height } = containerRef.current.getBoundingClientRect();
        p.createCanvas(width, height);
        p.background(255);
      };

      p.draw = () => {
        p.background(255);
        drawNode(200, 200, "Node 1");
        drawNode(400, 300, "Node 2");
      };
    };

    p5InstanceRef.current = new p5(sketch, containerRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
};

export default Canvas;
