/* eslint-disable react/prop-types */

import { Button, Card } from 'react-bootstrap';

function RepoCard({ userName, repoName, repoDescription, watchers, creationDateTime,onButtonClick }) {
    // const onButtonClick = () => {
    //     if (localStorage.getItem('log')) {
    //         console.log("k");
    //     }
    // };

    return (
        <Card>
            <Card.Header as="h5">{userName}</Card.Header>
            <Card.Body>
                <Card.Title>{repoName}</Card.Title>
                <Card.Text>{repoDescription}</Card.Text>
                <Card.Text>
                    Watchers: {watchers} | Created on: {creationDateTime}
                </Card.Text>
                <Button variant="primary" onClick={onButtonClick}>
                    Watch
                </Button>
            </Card.Body>
        </Card>
    );
}

export default RepoCard;
