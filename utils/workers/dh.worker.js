addEventListener("message", (event) => {
  // esto corre en otro thread, asi que
  // cualquier chamba hecha acá no laggea el UI
  console.log("diffie hellman worker received a message event: ", { e });

  // TODO: generar las cosas de diffie hellman acá

  console.log("generating keys...");
  console.log("diffie hellman worker finished");
  postMessage({
    part: Buffer.from("g^a mod p"),
    g: Buffer.from("g"),
    p: Buffer.from("p"),
  });
  // setTimeout(() => {
  // }, 1000);
});
