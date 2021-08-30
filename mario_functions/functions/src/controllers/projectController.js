const admin = require("firebase-admin");
const projectController = {
  getProject: async (req, res) => {
    try {
      const id = req.params.id;
      const result = admin.firestore().collection("projects").doc(id);
      const document = await result.get();
      const response = document.data();
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  allProjects: async (req, res) => {
    try {
      const projectList = [];
      await admin
        .firestore()
        .collection("projects")
        .get()
        .then((snapshot) => {
          const allProject = snapshot.docs;
          for (let doc of allProject) {
            const selectedDoc = {
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              authorFirstName: doc.data().authorFirstName,
              authorLastName: doc.data().authorLastName,
              authorId: doc.data().authorId,
              createdAt: doc.data().createdAt,
              view: doc.data().view,
              like: doc.data().like,
              comments: doc.data().comments,
            };
            projectList.push(selectedDoc);
          }
        });
      return res.status(200).json({ projectList: projectList });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = projectController;
