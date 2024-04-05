import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { getFeatureFlagsAction } from "../actions";

const tableHeaders = ["Is enabled", "Name", "Created at (YYYY-MM-DD)"];

export const FeatureFlagsTable = async () => {
  const featureFlags = await getFeatureFlagsAction();

  if (!featureFlags || !featureFlags.length) {
    return <Typography>No feature flags found</Typography>;
  }

  return (
    <div className="overflow-x-auto">
      <Table aria-label="feature flags list" className="table table-md">
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {featureFlags?.map((featureFlag) => (
            <TableRow
              key={featureFlag.id}
              className="hover"
              aria-label={featureFlag.name as string}
            >
              <TableCell align="left">
                <div className="flex items-center gap-4 justify-center pb-8">
                  <Switch
                    defaultChecked={featureFlag.isEnabled}
                    title={featureFlag.isEnabled ? "Enabled" : "Disabled"}
                  />
                </div>
              </TableCell>
              <TableCell>{featureFlag.name}</TableCell>
              <TableCell align="left">
                {featureFlag.createdAt.toLocaleString("eu", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
