import React from 'react';
import { Typography, Progress } from 'antd';

export default function LearnSummary(props) {
    return (
        <div>
            <Typography>Good answers</Typography>
            <Progress percent={70} successPercent={props.successPercent} />
        </div>
    );
}
