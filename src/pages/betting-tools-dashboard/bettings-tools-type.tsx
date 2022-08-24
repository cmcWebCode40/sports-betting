import React from 'react';
import DroppingOdds from './components/dropping-odds';
import ViewBlockedOdds from './components/view-blocked-odds';
import ViewCanceledPostPone from './components/view-canceled-postponed';
import ViewPopularMatches from './components/view-popular-matches';
import ViewValueBets from './components/view-value-bets';

const bettingTool = {
  pM: 'POPULAR MATCHES',
  lBP: 'LOW BET POSSIBILITIES',
  bBP: 'BLOCKED BETTING POSSIBILITIES',
  vB: 'VALUE BETTINGS',
  pCM: 'POSTPONED-CANCELED MATCHES',
};

const BettingToolsType = ({ match }: { match: { params: { type: string } } }): JSX.Element => {
  const { type } = match.params;

  const renderUI = () => {
    switch (type) {
      case bettingTool.pM:
        return <ViewPopularMatches />;
      case bettingTool.bBP:
        return <ViewBlockedOdds />;
      case bettingTool.pCM:
        return <ViewCanceledPostPone />;
      case bettingTool.vB:
        return <ViewValueBets />;
      case bettingTool.lBP:
        return <DroppingOdds />;
      default:
        return <h3>Not Found</h3>;
    }
  };
  return (
    <div
      style={{
        margin: '1rem',
      }}
    >
      {renderUI()}
    </div>
  );
};

export default BettingToolsType;
