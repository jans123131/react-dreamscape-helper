
-- Script to search for 'ReportLogo' in all tables and columns
-- This will search for the text 'ReportLogo' in all text-based columns across all tables

DECLARE @SearchText NVARCHAR(100) = 'ReportLogo'
DECLARE @TableName NVARCHAR(255)
DECLARE @ColumnName NVARCHAR(255)
DECLARE @SQL NVARCHAR(MAX)
DECLARE @Results TABLE (
    TableName NVARCHAR(255),
    ColumnName NVARCHAR(255),
    FoundValue NVARCHAR(MAX),
    RowCount INT
)

-- Cursor to iterate through all text-based columns in all tables
DECLARE column_cursor CURSOR FOR
SELECT 
    t.TABLE_NAME,
    c.COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLES t
INNER JOIN INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_NAME = c.TABLE_NAME
WHERE t.TABLE_TYPE = 'BASE TABLE'
  AND c.DATA_TYPE IN ('varchar', 'nvarchar', 'char', 'nchar', 'text', 'ntext')
  AND t.TABLE_SCHEMA = 'dbo' -- Adjust schema if needed

OPEN column_cursor
FETCH NEXT FROM column_cursor INTO @TableName, @ColumnName

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @SQL = '
        SELECT ''' + @TableName + ''' as TableName, 
               ''' + @ColumnName + ''' as ColumnName,
               ' + @ColumnName + ' as FoundValue,
               COUNT(*) as RowCount
        FROM [' + @TableName + ']
        WHERE ' + @ColumnName + ' LIKE ''%' + @SearchText + '%''
        GROUP BY ' + @ColumnName + '
        HAVING COUNT(*) > 0'
    
    INSERT INTO @Results (TableName, ColumnName, FoundValue, RowCount)
    EXEC sp_executesql @SQL
    
    FETCH NEXT FROM column_cursor INTO @TableName, @ColumnName
END

CLOSE column_cursor
DEALLOCATE column_cursor

-- Display results
SELECT * FROM @Results ORDER BY TableName, ColumnName

-- Also search for common settings table patterns
PRINT 'Searching common settings tables...'

-- Search in AppSettings table if it exists
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'AppSettings')
BEGIN
    SELECT 'AppSettings' as TableName, 'Key' as ColumnName, [Key], [Value] 
    FROM AppSettings 
    WHERE [Key] LIKE '%Logo%' OR [Value] LIKE '%Logo%'
END

-- Search in Settings table if it exists
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Settings')
BEGIN
    SELECT 'Settings' as TableName, 'Name' as ColumnName, Name, Value 
    FROM Settings 
    WHERE Name LIKE '%Logo%' OR Value LIKE '%Logo%'
END

-- Search in Configuration table if it exists
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Configuration')
BEGIN
    SELECT 'Configuration' as TableName, 'Key' as ColumnName, [Key], [Value] 
    FROM Configuration 
    WHERE [Key] LIKE '%Logo%' OR [Value] LIKE '%Logo%'
END

-- Search in any table with 'Config' in the name
DECLARE @ConfigTableSQL NVARCHAR(MAX) = ''
SELECT @ConfigTableSQL = @ConfigTableSQL + 
    'SELECT ''' + TABLE_NAME + ''' as TableName, * FROM [' + TABLE_NAME + '] WHERE EXISTS (
        SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = ''' + TABLE_NAME + ''' 
        AND DATA_TYPE IN (''varchar'', ''nvarchar'', ''char'', ''nchar'', ''text'', ''ntext'')
    ); '
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME LIKE '%Config%' OR TABLE_NAME LIKE '%Setting%'

IF @ConfigTableSQL != ''
BEGIN
    PRINT 'Found configuration tables:'
    PRINT @ConfigTableSQL
END
