import * as GroupsActions from './lib/+state/groups.actions';

import * as GroupsFeature from './lib/+state/groups.reducer';

import * as GroupsSelectors from './lib/+state/groups.selectors';

export * from './lib/+state/groups.facade';

export * from './lib/+state/groups.models';

export { GroupsActions, GroupsFeature, GroupsSelectors };
export * from './lib/groups-data-access.module';
