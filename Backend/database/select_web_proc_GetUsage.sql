--DECLARE @membership CHAR(10) = @id --'083376';

-- Construct the query string with parameters
DECLARE @qryGetMembers NVARCHAR(MAX);
SET @qryGetMembers = N'EXECUTE PROCEDURE web_proc_GetUsage (''' + @id + ''')';

-- Execute the dynamic SQL on the linked server
EXEC (@qryGetMembers) AT BOSS_Denver;