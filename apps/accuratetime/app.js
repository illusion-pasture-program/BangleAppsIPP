/**
 * Set Time Accurately
 *
 * Original Author: IPP
 * Created: June 2023
 *
 */

g.clear();

Bangle.http("https://worldtimeapi.org/api/timezone/Etc/UTC")
  .then((data) => {
    require("Storage")
      .open("messagesdebug.log", "a")
      .write(`${JSON.stringify(data.resp.datetime)}\n`);
    console.log(data.resp.datetime);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/*require("Font7x11Numeric7Seg").add(Graphics);

function getTimeDifference() {
  const startTime = new Date(); // Get the current time before making the API request

  Bangle.http("https://worldtimeapi.org/api/timezone/Etc/UTC")
    .then((data) => {
      const endTime = new Date(); // Get the current time after receiving the API response

      const apiDateTime = new Date(data.datetime);
      const localDateTime = new Date();

      const apiTimeDifference = apiDateTime.getTime() - startTime.getTime();
      const responseTime = endTime.getTime() - startTime.getTime();

      const localTimeDifference =
        localDateTime.getTime() - (startTime.getTime() + responseTime);

      console.log("API Time:", apiDateTime);
      console.log("Local Time:", localDateTime);
      console.log("API Time - Local Time Difference:", apiTimeDifference);
      console.log("Response Time:", responseTime);
      console.log("Local Time - API Time Difference:", localTimeDifference);

      const unixEpochTime =
        Math.floor(localDateTime.getTime() / 1000) -
        Math.floor(localTimeDifference / 1000);

      setTime(unixEpochTime); // Adjust the system time using the local time difference
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getTimeDifference();*/

Bangle.setUI({
  mode: "custom",
  back: load,
});

//displayOutput(0);
