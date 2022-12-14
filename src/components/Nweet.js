import React, { useState } from "react";
import { dbService } from "FbInstance";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import OnChangedInput, { OnChange, ReactInputChange } from "./ReactInputChange";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    const NweetsDoc = doc(dbService, "nweets", `${nweetObj.id}`);
    if (ok) {
      await deleteDoc(NweetsDoc);
    }
  };
  const onUpdateClick = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const NweetsDoc = doc(dbService, "nweets", `${nweetObj.id}`);

    await updateDoc(NweetsDoc, { text: newNweet });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="뭘봐"
              onChange={(event) => ReactInputChange(event, setNewNweet)}
              value={newNweet}
            ></input>
            <input type="submit" value="Update Nweet"></input>
          </form>
          <button onClick={onUpdateClick}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet </button>
              <button onClick={onUpdateClick}>Edit Nweet </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
