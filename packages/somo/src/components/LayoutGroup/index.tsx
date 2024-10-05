import { createMemo, on, ParentComponent, useContext } from 'solid-js';

import { LayoutGroupContext, LayoutGroupContextProps } from '../../context/LayoutGroupContext';
import { nodeGroup } from '../../projection';
import { createRef } from '../../utils/create-ref';
import { MutableRefObject } from '../../utils/safe-react-types';
import { useForceUpdate } from '../../utils/use-force-update';

type InheritOption = boolean | 'id';

export interface Props {
  id?: string;
  inherit?: InheritOption;
}

const shouldInheritGroup = (inherit: InheritOption) => inherit === true;
const shouldInheritId = (inherit: InheritOption) =>
  shouldInheritGroup(inherit === true) || inherit === 'id';

export const LayoutGroup: ParentComponent<Props> = ({ children, id, inherit = true }) => {
  const layoutGroupContext = useContext(LayoutGroupContext);
  const [forceRender, key] = useForceUpdate();
  const context = createRef(null) as MutableRefObject<LayoutGroupContextProps | null>;

  const upstreamId = layoutGroupContext.id;
  if (context.current === null) {
    if (shouldInheritId(inherit) && upstreamId) {
      id = id ? upstreamId + '-' + id : upstreamId;
    }

    context.current = {
      id,
      group: shouldInheritGroup(inherit) ? layoutGroupContext.group || nodeGroup() : nodeGroup(),
    };
  }

  const memoizedContext = createMemo(
    on(
      () => key,
      () => ({ ...context.current, forceRender }),
    ),
  );

  return (
    <LayoutGroupContext.Provider value={memoizedContext()}>{children}</LayoutGroupContext.Provider>
  );
};
