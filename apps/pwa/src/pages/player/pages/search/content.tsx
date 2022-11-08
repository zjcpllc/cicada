import absoluteFullSize from '#/style/absolute_full_size';
import { ReactNode } from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { Tab } from './constants';
import Music from './music';
import Singer from './singer';
import Lyric from './lyric';

const Container = styled(animated.div)`
  ${absoluteFullSize}
`;

function Content({ tab }: { tab: Tab }) {
  const transitions = useTransition(tab, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return transitions((style, t) => {
    let content: ReactNode = null;
    switch (t) {
      case Tab.MUSIC: {
        content = <Music />;
        break;
      }
      case Tab.SINGER: {
        content = <Singer />;
        break;
      }
      case Tab.LYRIC: {
        content = <Lyric />;
        break;
      }
    }
    return <Container style={style}>{content}</Container>;
  });
}

export default Content;
