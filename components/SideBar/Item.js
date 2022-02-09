export const ItemNav = ({icon, text}) => {
  return (
    <a
      href="https://demo.themesberg.com/windster/"
      class="text-base text-gray-500 hover:text-gray-200 font-normal rounded-lg flex items-center p-2 hover:bg-gray-500 group"
    >
     {icon}
      <span class="ml-3">{text}</span>
    </a>
  );
};
