import React from "react";

const MainPage = ({ menuList, placeName, id, slowData }) => {
  return (
    <>
      <h1>
        Witamy w {placeName} przy stoliku numer {id}
      </h1>
      <p>Slow data: {slowData}</p>
      {menuList.map((item, idx) => (
        <p key={idx}>{item.node.name}</p>
      ))}
    </>
  );
};

function timeout(ms) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(1), ms));
}

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

  const simulateTimeout = await timeout(5000);

  return {
    props: {
      menuList,
      placeName: ctx.query.placeName,
      id: ctx.query.id,
      slowData: simulateTimeout,
    },
  };
}

export default MainPage;
