import Review from "../models/Review";

async function removeDuplicateData(){
  try {
    const duplicates = await Review.aggregate([
      // Group by the fields you want to check for duplicates
      {
        $group: {
          _id: { text: { $substrCP: ["$text", 0, 10] }, title: "$title" },
          count: { $sum: 1 },
          ids: { $addToSet: "$_id" }
        }
      },
      // Filter for documents with a count greater than 1 (duplicates)
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    for (const duplicate of duplicates) {
      const [keepId, ...removeIds] = duplicate.ids;
      // Remove the duplicates except for the first occurrence
      await Review.deleteMany({ _id: { $in: removeIds } });
    }

    console.log("Duplicates removed successfully.");
  } catch (error) {
    console.error(error);
    // Handle error here
  }
  console.log("duplicate Data Removed")
  }

  export default removeDuplicateData;