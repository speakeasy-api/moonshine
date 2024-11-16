// the workspace switcher will provide a list of recent workspaces to the user
// as a prop
// but whenever a workspace is selected, we want to add it to the list
// and we want to remove the oldest workspace if there are more than 5

import { Org, Workspace } from '@/components/WorkspaceSelector'
import useLocalStorageState from './useLocalStorageState'

export default function useRecentWorkspacesFromLocalStorage(recents: Org[]) {
  const [recentOrgs, setRecentOrgs] = useLocalStorageState<Org[]>(
    'recent-workspaces',
    recents
  )

  const addRecentWorkspace = (org: Org, workspace: Workspace) => {
    // pop the oldest workspace if there are more than 5
    if (recentOrgs.length >= 5) {
      recentOrgs.pop()
    }
    setRecentOrgs([
      { ...org, workspaces: [workspace, ...org.workspaces] },
      ...recentOrgs,
    ])
  }

  return {
    addRecentWorkspace,
  }
}
