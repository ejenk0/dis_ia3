import { faPaw, faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar({ page }) {
  const changePage = (e) => {
    page[1](e.currentTarget.id);
  };
  const buttonClass =
    "w-full h-full flex-grow hover:bg-council_primary_hover p-1 border-r last:border-0 border-neutral-800";
  return (
    <div className="flex w-full bg-council_primary h-16 border-t-neutral-800 border-t items-center">
      <button
        onClick={changePage}
        id="koalas"
        className={
          buttonClass +
          (page[0] === "koalas" ? " bg-council_primary_hover" : "")
        }
      >
        <FontAwesomeIcon icon={faPaw} className="w-full h-full" />
      </button>
      <button
        onClick={changePage}
        id="trees"
        className={
          buttonClass + (page[0] === "trees" ? " bg-council_primary_hover" : "")
        }
      >
        <FontAwesomeIcon icon={faTree} className="w-full h-full" />
      </button>
      {/* <button className="w-full h-full flex-grow hover:bg-council_primary_hover p-1">
        <FontAwesomeIcon icon={faPaw} className="w-full h-full" />
      </button> */}
    </div>
  );
}
