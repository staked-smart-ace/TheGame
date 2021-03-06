import {
  Avatar,
  Box,
  Button,
  HStack,
  MetaButton,
  Spinner,
  Text,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { Web3Context } from 'contexts/Web3Context';
import React, { useCallback, useContext } from 'react';

import { useUser } from '../lib/hooks';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

export const LoginButton: React.FC = () => {
  const { connectWeb3, disconnect, isConnected } = useContext(Web3Context);

  const { user, fetching } = useUser();

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);

  if (isConnected) {
    if (fetching) {
      return <Spinner color="purple.500" size="sm" />;
    }
    if (!user?.player) return null;
    return (
      <HStack>
        <Avatar
          src={getPlayerImage(user.player)}
          name={getPlayerName(user.player)}
          as={MetaLink}
          href={`/player/${user.username}`}
        />
        <Box>
          <MetaLink
            href={`/player/${user.username}`}
            fontFamily="body"
            color="whiteAlpha.700"
          >
            {user.player ? getPlayerName(user.player) : 'Unknown'}
          </MetaLink>
          <HStack spacing={2}>
            <MetaLink href="/profile/setup">Setup profile</MetaLink>
            <Text color="cyan.400">|</Text>
            <Button
              onClick={disconnect}
              fontFamily="body"
              color="cyan.400"
              variant="link"
              fontWeight="normal"
            >
              Disconnect
            </Button>
          </HStack>
        </Box>
      </HStack>
    );
  }
  return (
    <MetaButton size="md" px={8} onClick={handleLoginClick}>
      Connect
    </MetaButton>
  );
};
