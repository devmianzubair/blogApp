const admin = require("firebase-admin");
const projectAnalytics = async (req, res, next) => {
  try {
    const id = req.params.id;

    const doc = admin.firestore().collection("projects").doc(id);
    const getDoc = await doc.get();
    const getData = getDoc.data();
    await doc.update({
      title: getData.title,
      content: getData.content,
      authorName: getData.authorName,
      authorId: getData.authorId,
      createdAt: getData.createdAt,
      view: getData.view + 1,
    });

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = projectAnalytics;
