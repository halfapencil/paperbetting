import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";
import { NBA_STAT_COLUMNS } from "@/lib/nba/nbaColumns";
type NBAStatRowProps = {
    row: nbaPlayerStatRow;
    index: number;
    updateRow: (
        index: number,
        field: keyof nbaPlayerStatRow,
        value: string | number
    ) => void;
};

export default function NBAStatRow({
    row,
    index,
    updateRow
}: NBAStatRowProps) {
    return (
        <tr>
            {
                NBA_STAT_COLUMNS.map((column) => (
                    <td key={column.key}>
                        <input
                            value={row[column.key]}
                            type="text"
                            onChange={(e) =>
                                updateRow(index, column.key, e.target.value)
                            }
                        />
                    </td>
                ))
            }
        </tr>
    );
}