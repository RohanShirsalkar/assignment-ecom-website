import { useContext, useState } from "react";

const specifications = {
  Fabric: "Cotton",
  Pattern: "Printed",
  Color: "Mustard",
  Fit: "Regular Fit",
  Occasion: "Festive",
};

const accordionData = [
  {
    title: "Description",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos dolorem ab possimus rerum ea earum explicabo, omnis, hic accusantium iusto asperiores. Cupiditate, porro cumque! Reprehenderit, assumenda optio! Tempora numquam eligendi eum tempore.",
  },
  {
    title: "Shipping Details",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos dolorem ab possimus rerum ea earum explicabo, omnis, hic accusantium iusto asperiores. Cupiditate, porro cumque! Reprehenderit, assumenda optio! Tempora numquam eligendi eum tempore.",
  },
];

const SpecificationAndDetailsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="border-t mt-8 pt-6">
      {/* Specifications Section */}

      <h3 className="text-lg font-bold mb-4">Specifications</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <tbody>
            {Object.entries(specifications).map(([key, value], index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b`}
              >
                <td className="px-4 py-2 text-left font-semibold text-gray-700 border-r border-gray-300">
                  {key}
                </td>
                <td className="px-4 py-2 text-left text-gray-600">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accordion Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">More Details</h3>
        {accordionData.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left font-semibold text-gray-800 py-2 px-4 bg-gray-100 rounded-md flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span>
                {activeIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414L9 4.586a1 1 0 011.414 0l3.707 3.707a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L10 8.414l-2.293 2.293a1 1 0 01-1.414 0L5.293 9.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 011.414 0L10 6.414l2.293 2.293a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L5.293 9.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-2 text-gray-600 bg-white border-l border-r border-b rounded-b-md">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificationAndDetailsSection;
