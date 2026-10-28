/**
 * react-icons (FontAwesome / Fi)
 * npm install react-icons
 */

import { FaTrash } from "react-icons/fa";

export default function WhiteBinIcon() {
  return (
    <div
      style={{
        backgroundColor: "black",
        borderRadius: "6px",
        color: "white",
        display: "inline-flex",
        padding: "10px",
      }}
    >
      <FaTrash size={20} />
    </div>
  );
}
