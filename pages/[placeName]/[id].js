import React from "react";

const MainPage = ({ menuList, placeName, id }) => {
  return (
    <>
      <h1>
        Witamy w {placeName} przy stoliku numer {id}
      </h1>
      {menuList.map((item, idx) => (
        <p key={idx}>{item.node.name}</p>
      ))}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await fetch("https://jammyorder-9b978.firebaseio.com/Meals.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const menuList = Object.keys(data).map((item) => ({
    node: {
      ...data[item],
      name: item,
    },
  }));

  setTimeout(() => {
    console.log("no i trzeba czekac");
  }, 5000);

  return {
    props: {
      menuList,
      placeName: ctx.query.placeName,
      id: ctx.query.id,
    },
  };
}

export default MainPage;
