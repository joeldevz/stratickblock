export const ItemNav = ({ icon, text, link }) => {
  return (
    <a
      href={link}
      className="text-base text-gray-500 hover:text-gray-200 font-normal rounded-lg flex items-center p-2 hover:bg-gray-500 group"
    >
      {icon}
      <span className="ml-3">{text}</span>
    </a>
  );
};
