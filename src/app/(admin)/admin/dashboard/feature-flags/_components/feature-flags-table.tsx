import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { FeatureFlagSwitch } from "./feature-flag-switch";
import { DeleteFeatureFlagDialog } from "./delete-feature-flag-dialog";
import { getFeatureFlagsAction } from "../actions";

const tableHeaders = [
  "Is enabled",
  "Name",
  "Created at (YYYY-MM-DD)",
  "Actions",
];

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
                <FeatureFlagSwitch
                  isEnabled={featureFlag.isEnabled}
                  name={featureFlag.name}
                />
              </TableCell>
              <TableCell>{featureFlag.name}</TableCell>
              <TableCell align="left">
                {featureFlag.createdAt.toLocaleString("eu", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell align="left">
                <DeleteFeatureFlagDialog name={featureFlag.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
