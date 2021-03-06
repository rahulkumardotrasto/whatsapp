import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router";

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users, user)));

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);
    
    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL}/>
            ):(<UserAvatar src={recipientEmail}/>)}
            
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

export const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover {
        background-color: #e9eaeb;
    }
`;

export const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;
