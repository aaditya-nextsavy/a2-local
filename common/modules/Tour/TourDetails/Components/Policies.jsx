import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';

function Policies(props) {
    useEffect(() => {
        // console.log("policy", props.thePolicies)
    }, [props.thePolicies])

    return (
        <>
            <div className="policies-wrapper">
                <div className="SectionTitle">
                    <h5><Trans i18nKey="tourPage.policies"></Trans></h5>
                </div>
                <div className="policies" dangerouslySetInnerHTML={{ __html: `${props.thePolicies}` }}>
                </div>
            </div>
        </>
    );
}

export default Policies;
