import { FC } from "react";
import useCanvas from "./useCanvas";

const Canvas: FC<{className: string}> = ({className}) => {
  const ref = useCanvas();
  return <canvas className={className} ref={ref} />;
};

export default Canvas;
