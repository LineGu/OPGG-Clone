import React from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_SUMMONER = 'hide on bush';

function useHandleAPIError() {
  const navigate = useNavigate();
  const errorHandler = (err: Error, summonerName: string) => {
    console.error(err);
    console.log(summonerName);

    if (summonerName !== DEFAULT_SUMMONER) navigate('/');
  };

  return { errorHandler };
}

export default useHandleAPIError;
