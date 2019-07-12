import React from 'react';
import { Typography, Progress, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

export default function LearnSummary(props) {
    let good = 0;
    let average = 0;
    let wrong = 0;
    let total = 0;

    props.questionsStats.forEach((element) => {
        good += element.good;
        average += element.average;
        wrong += element.wrong;
    });

    total = good + average + wrong;
    const goodPct = Number(((good / total) * 100).toFixed(2));
    const averagePct = Number(((average / total) * 100).toFixed(2));
    const wrongPct = Number(((wrong / total) * 100).toFixed(2));

    return (
        <div>
            <Typography.Title type={2}>Summary</Typography.Title>

            <Typography>Good answers</Typography>
            <Tooltip title={`${good} good / ${total} total`}>
                <Progress percent={goodPct} strokeColor="#87d068" />
            </Tooltip>

            <Typography>Average answers</Typography>
            <Tooltip title={`${average} average / ${total} total`}>
                <Progress percent={averagePct} strokeColor="yellow" />
            </Tooltip>

            <Typography>Wrong answers</Typography>
            <Tooltip title={`${wrong} wrong / ${total} total`}>
                <Progress percent={wrongPct} status="exception" />
            </Tooltip>

            <Link to="/collections">
                <Button>Return to collections</Button>
            </Link>
        </div>
    );
}
