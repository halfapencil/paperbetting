import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";

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
            <td>
                <input value={0} onChange={(e) => console.log(e)} />
            </td>
        </tr>
    );
}