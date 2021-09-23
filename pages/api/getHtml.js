import cheerio from "cheerio";
import axios from "axios";

export default async (req, res) => {
  const { url } = req.body;
  // console.log(">> url " + url);
  try {
    // let config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "Content-Type": "text/plain",
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // };
    const { data } = await axios.get(`${url}`);
    // console.log(data);
    const $ = cheerio.load(data);
    const urlFile = $(".InstallButtonWrapper-download-link").attr("href");
    const extensionName = $("h1.AddonTitle").children().remove().end().text();
    return res.status("200").send({
      urlFile,
      extensionName
    });
  } catch (err) {
    console.log("=======>>>" + err);
    return res.status("200").send({});
  }

  // return res.status("200").send({});
};
