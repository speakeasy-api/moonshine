import { Org } from ".";
import { CommandItem } from "../Command";
import { GradientCircle } from "../GradientCircle";
import { Icon } from "../Icon";
import { cn } from "@/lib/utils";
import { ScrollingList } from "./ScrollingList";
import { VirtuosoHandle } from "react-virtuoso";
import { useEffect, useRef, useState } from "react";
import { SearchBox } from "./SearchBox";
import { Text } from "../Text";

interface OrgListProps {
  orgs: Org[];
  enableRecents: boolean;
  showRecents: boolean;
  selectedOrg?: Org;
  setSelectedOrg: (org: Org) => void;
  onSelectRecent: () => void;
  filterOrgFunc: (org: Org, search: string) => boolean;
}

export function OrgList({
  orgs,
  showRecents,
  selectedOrg,
  setSelectedOrg,
  enableRecents,
  onSelectRecent,
  filterOrgFunc,
}: OrgListProps) {
  const virtuoso = useRef<VirtuosoHandle | null>(null);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredOrgs, setFilteredOrgs] = useState(orgs);

  useEffect(() => {
    setFilteredOrgs(orgs.filter((org) => filterOrgFunc(org, search)));
  }, [search, filterOrgFunc, orgs]);

  useEffect(() => {
    if (selectedOrg && virtuoso.current) {
      const index = orgs.findIndex((org) => org.slug === selectedOrg.slug);

      setTimeout(() => {
        virtuoso.current?.scrollIntoView({
          index,
          behavior: orgs.length < 10 ? "smooth" : "auto",
        });
      }, 100);
    }
  }, [selectedOrg, orgs]);

  return (
    <div className="flex h-full w-full flex-col border-neutral-softest @[640px]:w-1/3 @[640px]:border-r">
      <SearchBox
        inputRef={inputRef}
        placeholder="Search organizations..."
        search={search}
        setSearch={setSearch}
      />

      {filteredOrgs.length > 0 ? (
        <ScrollingList
          items={filteredOrgs}
          ref={virtuoso}
          renderItem={(org) => (
            <CommandItem
              key={org.slug}
              onSelect={() => setSelectedOrg(org)}
              value={`org-${org.slug}`}
              className={cn(
                "flex cursor-pointer flex-row gap-3 rounded-none p-4 text-base hover:!bg-accent/40 @[640px]:max-w-lg",
                !showRecents &&
                  selectedOrg?.slug === org.slug &&
                  "bg-accent/40 font-semibold text-accent-foreground",
              )}
            >
              <GradientCircle name={org.label} />
              <Text className="truncate">{org.slug}</Text>
              {!showRecents && selectedOrg?.slug === org.slug && (
                <div className="ml-auto">
                  <Icon name="chevron-right" size="small" />
                </div>
              )}
            </CommandItem>
          )}
        />
      ) : (
        <div className="m-auto flex h-full max-w-2/3 items-center justify-center p-6 text-center text-muted-foreground">
          No organizations found
        </div>
      )}

      {enableRecents && (
        <div className="border-t border-neutral-softest bg-background">
          <CommandItem
            onSelect={onSelectRecent}
            className={cn(
              "sticky top-0 z-10 m-1 flex cursor-pointer items-center bg-background p-4 text-base text-foreground/80",
              showRecents && "font-semibold text-accent-foreground",
            )}
          >
            <Icon name="history" />
            <Text>Recently used</Text>
            {showRecents && (
              <div className="ml-auto">
                <Icon name="chevron-right" size="2xl" />
              </div>
            )}
          </CommandItem>
        </div>
      )}
    </div>
  );
}
